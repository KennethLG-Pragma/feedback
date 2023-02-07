import { DynamoDB } from 'aws-sdk'
import { CommentEntity } from 'src/core/domain/entities/commentEntity'
import { CommentRepository } from 'src/core/domain/repositories/commentRepository'
import { LastCommentValueObject } from 'src/core/domain/valueObjects/lastCommentValueObject'
import config from './../config/index'

export class DynamoCommentRepository implements CommentRepository {
  private readonly dbClient = new DynamoDB.DocumentClient()

  async getOnlyComments(
    userEmail: string,
    commentsLength: number
  ): Promise<CommentEntity[]> {
    const response = await this.dbClient
      .query({
        TableName: config.COMMENTS_TABLE,
        KeyConditionExpression: 'userEmail = :userEmailValue',
        ExpressionAttributeValues: {
          ':userEmailValue': userEmail
        },
        ScanIndexForward: false
      })
      .promise()

    const comments = response.Items as unknown as CommentEntity[]
    const onlyComments = []

    for (const comment of comments) {
      if (onlyComments.length === commentsLength) break
      if (comment.comment) onlyComments.push(comment)
    }

    return onlyComments
  }

  async getUserComments(
    userEmail: string,
    commentsLength: number,
    commentDatePagination?: string
  ): Promise<{
    comments: CommentEntity[]
    lastItem?: LastCommentValueObject
  }> {
    const queryConfig: DynamoDB.DocumentClient.QueryInput = {
      TableName: config.COMMENTS_TABLE,
      KeyConditionExpression: 'userEmail = :userEmailValue',
      ExpressionAttributeValues: {
        ':userEmailValue': userEmail
      },
      ScanIndexForward: false,
      Limit: commentsLength
    }

    if (commentDatePagination) {
      queryConfig.ExclusiveStartKey = {
        userEmail,
        commentDate: commentDatePagination
      }
    }

    const response = await this.dbClient.query(queryConfig).promise()

    return {
      comments: response.Items as unknown as CommentEntity[],
      lastItem: response.LastEvaluatedKey as unknown as LastCommentValueObject
    }
  }

  async createComments(comments: CommentEntity[]): Promise<CommentEntity[]> {
    await this.dbClient
      .batchWrite({
        RequestItems: {
          [config.COMMENTS_TABLE]: comments.map((comment) => ({
            PutRequest: {
              Item: comment
            }
          }))
        }
      })
      .promise()

    return comments
  }
}
