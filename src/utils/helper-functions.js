export const sleep = (ms) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  );


export const snapshotToDocument = (documentSnapshot) => {
  if (documentSnapshot.exists) {
    return {
      ...documentSnapshot.data(),
      id: documentSnapshot.id,
    }
  } else {
    return null;
  }
}