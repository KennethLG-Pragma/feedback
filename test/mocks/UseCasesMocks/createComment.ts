export const userEmail = 'carlos.lopez@pragma.com.co'
export const commentsLimit = 3
export const invalidUserEmail = 'carlos.lopez'
export const invalidCommentsLimit = 'a'
export const commentDate = '2022-12-22T19:46:47.245Z'

export const userInfoData = {
  given_name: 'Pedro',
  family_name: 'Gomez',
  email: 'pedro.gomez@pragma.com.co'
}

export const commentsData = [
  {
    userEmail: 'julian.perez@pragma.com.co',
    userName: 'Julian Perez',
    leaderEmail: 'david.tolosa@pragma.com.co',
    leaderName: 'David Tolosa',
    comment: 'Terminó reto backend',
    event:"Daily"
  },
  {
    userEmail: 'carlos.lopez@pragma.com.co',
    userName: 'Carlos Lopez',
    leaderEmail: 'david.tolosa@pragma.com.co',
    leaderName: 'David Tolosa',
    comment: 'Terminó reto backend con microservicios',
    event:"Daily"
  }
]

export const UserCommentsData = [
  {
    userEmail: 'carlos.lopez@pragma.com.co',
    userName: 'Carlos Lopez',
    leaderEmail: 'david.tolosa@pragma.com.co',
    leaderName: 'David Tolosa',
    comment: 'Terminó reto backend con microservicios',
    commentDate: '2022-11-30T16:27:03.094Z'
  },
  {
    userEmail: 'carlos.lopez@pragma.com.co',
    userName: 'Carlos Lopez',
    leaderEmail: 'david.tolosa@pragma.com.co',
    leaderName: 'David Tolosa',
    comment: 'No hizo nada',
    commentDate: '2022-12-01T16:27:03.094Z'
  },
  {
    userEmail: 'carlos.lopez@pragma.com.co',
    userName: 'Carlos Lopez',
    leaderEmail: 'david.tolosa@pragma.com.co',
    leaderName: 'David Tolosa',
    comment: 'Estudiando AWS',
    commentDate: '2022-12-02T16:27:03.094Z'
  }
]

export const mockUserImageRepository = {
  getUserImages: jest.fn()
}

export const mockCommentRepository = {
  createComments: jest.fn(),
  getUserComments: jest.fn(),
  getOnlyComments: jest.fn()
}
