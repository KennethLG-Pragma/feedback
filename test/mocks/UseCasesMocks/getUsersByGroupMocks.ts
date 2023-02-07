export const groupMocked = 'slytherin 1'
export const paginationPage = '1'
export const paginationLimit = '2'

export const mockedUser = {
  email: 'jimena.leyva@pragma.com.co',
  id: 73989519,
  fullname: 'Jimena del Carmen Leyva Aguilar',
  capacity: 'Móvil',
  TPEntryDate: '2022-09-26T05:00:00.000Z',
  status: 'Estudiando'
}

export const mockedUsers = {
  users: [
    {
      email: 'jimena.leyva@pragma.com.co',
      id: 73989519,
      fullname: 'Jimena del Carmen Leyva Aguilar',
      capacity: 'Móvil',
      TPEntryDate: '2022-09-26T05:00:00.000Z',
      status: 'Estudiando'
    },
    {
      email: 'joel.dovale@pragma.com.co',
      id: 10228333,
      fullname: 'joel enrrique dovale arrieta',
      capacity: 'Backend',
      TPEntryDate: '2022-10-03T05:00:00.000Z',
      status: 'Estudiando'
    }
  ],
  length: 2
}

export const mockedUserImages = [
  {
    id: '02e69e9e-09fd-4eae-8ab9-1f477bbfeb0c',
    contenido: 'images/users_avatar/joel_dovale@pragma_com_co_REDONDA.png',
    tipoFotografia: 'REDONDA'
  },
  {
    id: 'c59e105d-6a41-46b2-ab6a-8181a61b8e1a',
    contenido: 'images/users_avatar/joel_dovale@pragma_com_co_CUADRADO.png',
    tipoFotografia: 'CUADRADO'
  }
]

export const mockedResolvedUsers = {
  users: mockedUsers.users.map((user) => {
    return {
      ...user,
      images: mockedUserImages
    }
  }),
  length: 2
}

export const mockedResolvedUsersImageNullable = {
  users: mockedUsers.users.map((user) => {
    return {
      ...user,
      images: null
    }
  }),
  length: 2
}

export const userRepository = {
  getUsers: jest.fn(),
  getUsersByGroup: jest.fn(),
  getUserByEmail: jest.fn(),
  getUserInfo: jest.fn()
}

export const userImageRepository = {
  getUserImages: jest.fn()
}
