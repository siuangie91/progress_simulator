///////////
/* YOU DO NOT NEED TO CHANGE ANYTHING BETWEEN LINE 1 and LINE 40  */
//////////
export const STATUSES = ['disconnected', 'loading', 'connecting', 'importing', 'finishing', 'connected']

function connect() {
  let progress = 0
  let status = STATUSES[0]

  let i = 0
  return function(callback) {
    (function loop(next, progress) {
      var rand = Math.round(Math.random() * 1000) + 500;
      setTimeout(function() {
        if (STATUSES[next]) {
          callback({
            progress: progress.toFixed(2),
            status: STATUSES[next]
          });
          loop(next + 1, progress * 1 + (1 / (STATUSES.length - 1)));
        } else {
          return
        }
      }, rand);
    }(i, progress))
  }
};

export const run = connect();

export const connections = [
  { id: 1, run },
  { id: 2, run },
  { id: 3, run },
  { id: 4, run },
  { id: 5, run }
];

//////////
/* YOU DO NOT NEED TO CHANGE ANYTHING ABOVE THIS LINE */
//////////
