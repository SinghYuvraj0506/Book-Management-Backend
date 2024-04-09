
// get continuously recursive chapters -------------------
export async function getChapters(bookId, parentChapterId = null) {
    try {
      let matchStage = {
        bookId: bookId
      };
  
      if (parentChapterId) {
        matchStage.parentChapter = parentChapterId;
      } else {
        matchStage.parentChapter = { $eq: null };
      }
  
      const chapters = await Chapters.aggregate([
        {
          $match: matchStage
        },
        {
          $sort: {
            pageStart: 1
          }
        },
        {
          $lookup: {
            from: 'chapters',
            localField: 'subChapters',
            foreignField: '_id',
            as: 'subChapters'
          }
        }
      ]);
  
  
      // Recursively fetch sub-chapters for each chapter
      for (const chapter of chapters) {
        if (chapter.subChapters.length > 0) {
          chapter.subChapters = await getChapters(bookId, chapter._id);
        }
      }
  
  
      return chapters;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  
