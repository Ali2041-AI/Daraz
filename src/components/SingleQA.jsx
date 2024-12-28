import images from "../assets/Images";

function SingleQA({ message, customerName, createdAt, repliedAt, reply }) {
  

    

    // Function to calculate time difference
    const calculateTimeDifference = (startTime, endTime) => {
        const diffInMs = endTime - startTime; // Difference in milliseconds
        const diffInSeconds = Math.floor(diffInMs / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInDays > 0) {
            return `${diffInDays} day(s) ago`;
        } else if (diffInHours > 0) {
            return `${diffInHours} hour(s) ago`;
        } else if (diffInMinutes > 0) {
            return `${diffInMinutes} minute(s) ago`;
        } else {
            return "Just now";
        }
    };

    // Calculate "message sent" time
    const createdAtDate = new Date(createdAt);
    const dateNow = new Date();
    const sendMessageDate = calculateTimeDifference(createdAtDate, dateNow);

    // Calculate "reply time" if `repliedAt` is provided
    let replyTimeMessage = "Not replied yet";
    if (repliedAt) {
        const repliedAtDate = new Date(repliedAt);
        replyTimeMessage = `answered within ${calculateTimeDifference(createdAtDate, repliedAtDate)}`;
    }

    return (
        <div>
          
          {
          message
          ?  <div className="flex flex-col gap-4 border-b pb-4 pl-4 mb-4">
          {/* Question Section */}
          <div className="question-area">
              <div className="flex gap-4 font-light">
                  <img src={images.questionIcon} className="w-4 h-5 md:w-6 md:h-6 pt-1" alt="" />
                  <div>
                      <p className="tracking-wide mb-1 text-[14px] md:text-base">{message}</p>
                      <div className="time-name-area text-[11.5px] opacity-55 tracking-wide">
                          <p>{customerName} - {sendMessageDate}</p>
                      </div>
                  </div>
              </div>
          </div>

          {/* Answer Section */}
          <div className="answer-area">
              <div className="flex gap-4 font-light">
                  <img src={images.answerIcon} className="w-4 h-5 pt-1 md:w-6 md:h-6"  alt="" />
                  <div>
                      <p className="tracking-wide mb-1 text-[14px] md:text-base">{reply}</p>
                      <div className="time-name-area text-[11.5px] opacity-55 tracking-wide">
                          {reply
                          ?<p>(seller) - {replyTimeMessage}</p>
                          : <p>No reply yet.</p>
                         }
                          
                      </div>
                  </div>
              </div>
          </div>
          
      </div>
          :""
          }


        </div>
       
    );
}

export default SingleQA;
