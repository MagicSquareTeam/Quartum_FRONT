export function getAllTagsSuccess(state, tags) {
  state.tags = tags;
}

export function getAllTagsFailure(state) {
  state.tags = null
}
