export const processHashtags = (caption?: string) => {
  return (
    caption?.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g)?.map((tag) => ({
      where: { hashtag: tag },
      create: { hashtag: tag },
    })) || []
  );
};
