import axiosClient from './axiosClient'

export const imageServices = {
  postImage: async (image: FormData) => {
    return axiosClient.post('/upload', image)
  },
}
