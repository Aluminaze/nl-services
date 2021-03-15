const deleteParticipant = (userId: string, refParticipants: any): void => {
  let childKey: string = "";

  refParticipants
    .orderByChild("id")
    .equalTo(userId)
    .on("value", function (snapshot: any) {
      snapshot.forEach(function (data: any) {
        childKey = data.key;
      });
    });

  if (childKey) {
    refParticipants.child(childKey).remove();
  } else {
    //
    // TODO: Реализовать отладку ошибок и логирование
    //
    alert(`Ошибка при удалении участника с ID: ${userId}`);
  }
};

export default deleteParticipant;
