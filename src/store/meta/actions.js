import MetaService from "src/services/meta.service";

export function getAllTags ({commit}) {
  return MetaService.getAllTags().then(
    tags => {
      commit('getAllTagsSuccess', tags)
      return Promise.resolve(tags)
    },
    error => {
      commit('getAllTagsFailure')
      return Promise.reject(error)
    }
  )
}
