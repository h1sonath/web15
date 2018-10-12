$.ajax({
    url: 'http://localhost:3003/voteQuest',
    type: "GET",
    success: function(response){
      if(response){
        let totalVote = response.yes+response.no;
        $("#sumvote").text(totalVote)
        $("#vote_yes").text(response.yes/totalVote*100);
        $("#vote_no").text(response.no/totalVote*100);
        $("#questvote").text(response.questionContent);
      }
    },
    error: function(err){
      console.log(err);
    }
  })

  $('#otherQuestion').on("click", function(){
    $.ajax({
      url: 'http://localhost:3003/vote',
      type: 'GET',
      success: function(response){
        if(response){
          window.location.href = "/answer";
        }
      },
      error: function(err){
        console.log(err);
      }
    })
  });