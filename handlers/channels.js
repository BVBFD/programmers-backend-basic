let db = new Map();
let id = 1;

// 채널 전체 조회
const getAllChannel = (req, res) => {
  // 원래는 JWT 토큰으로 암호화된 토큰을 headers에 넣어야함. (보안)
  // 지금은 간단한 실습이기에 이렇게 하는 것임.
  const { userId } = req.body;

  if (!userId) {
    res.status(400).json({ message: "로그인이 필요한 페이지 입니다!!" });
  }

  if (db.size === 0) {
    res.status(404).json({ message: "조회할 채널이 없습니다!!" });
  }

  const dbList = Array.from(db.entries()).map(([id, channel]) => ({
    id,
    channel,
  }));

  //   userId 유효성 검사
  const validateUserId = () => {
    let result = dbList.find((value) => value.channel.userId === userId);
    if (result) {
      return true;
    } else {
      return false;
    }
  };

  if (validateUserId()) {
    return res.status(200).json(dbList);
  } else {
    return res
      .status(404)
      .json({ message: "회원님이 가지고 있는 채널이 없습니다!!!" });
  }
};

// 채널 개별 생성
const makeNewChannel = (req, res) => {
  const { channelTitle, userId } = req.body;
  const reqChannel = req.body;

  if (!channelTitle || !userId) {
    return res
      .status(401)
      .json({ message: "요청 사항을 제대로 입력해주세요!!!" });
  } else {
    db.set(id, { ...reqChannel, subNum: 0, videoNum: 0 });
    let newChannel = db.get(id);
    id++;
    return res.status(201).json({
      message: `${channelTitle} 채널을 응원합니다!!!`,
      newChannel: { id: id - 1, ...newChannel },
    });
  }
};

// 채널 전체 삭제
const deleteAllChannel = (req, res) => {
  if (db.size === 0) {
    return res
      .status(200)
      .json({ message: "삭제할 채널이 하나도 존재하지 않습니다!!!" });
  } else {
    db.clear();
    return res.status(200).json({ message: "모든 채널이 삭제되었습니다!!!" });
  }
};

// 채널 개별 수정
const editChannelById = (req, res) => {
  const id = req.params.id;
  const editedChannel = req.body;

  if (!id || !editedChannel) {
    return res
      .status(400)
      .json({ message: "요청 매개변수를 정확히 입력해주세요!!!" });
  }

  const channel = db.get(id);

  if (channel) {
    db.set(id, { ...channel, ...editedChannel });
    const editedFinished = db.get(id);
    return res.status(200).json({
      message: `채널명이 ${editedChannel.channelTitle}으로 성공적으로 수정되었습니다!!!`,
      editedChannel: {
        id,
        editedFinished,
      },
    });
  } else {
    return res
      .status(400)
      .json({ message: "수정하고자 하는 채널이 존재하지 않습니다!!!" });
  }
};

// 채널 개별 조회
const getChannelById = (req, res) => {
  const id = req.params.id;
  const channel = db.get(id);

  if (channel) {
    return res.status(200).json({ id, channel });
  } else {
    return res
      .status(400)
      .json({ message: "찾으시는 채널이 존재하지 않습니다!!!" });
  }
};

// 채널 개별 삭제
const deleteChannelById = (req, res) => {
  const id = req.params.id;

  if (db.has(id)) {
    db.delete(id);
    return res.status(200).json({ message: "해당 채널이 삭제되었습니다!!!" });
  } else {
    return res
      .status(404)
      .json({ message: "찾으시는 채널이 존재하지 않습니다!!!" });
  }
};

module.exports = {
  getAllChannel,
  makeNewChannel,
  deleteAllChannel,
  editChannelById,
  getChannelById,
  deleteChannelById,
};
