// l. 307. Refactoring Reducers. Optional. Ik gebruik 'm NIET

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
};