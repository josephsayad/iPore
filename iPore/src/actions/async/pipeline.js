import axios from 'axios';

export default {
  createAndRunPipelineInstance: (pipelineName, fast5Path, referencePath, id) => {
    console.log(id);
    return new Promise((resolve, reject) => {
      if (pipelineName !== '' && fast5Path !== '' && referencePath !== '') {
        axios.get('http://localhost:3000/api/user/' + id + '/run/' + pipelineName.toLowerCase(), {
            pipelineName
          })
          .then(response => {
            const { result } = response.data;

            if (result.message !== undefined && result.message === 'Run does not exist.') {
              axios.post('http://localhost:3000/api/user/' + id + '/run/', {
                  pipelineName,
                  fast5Path,
                  referencePath
                })
                .then(run => {
                  resolve(run.data.result);
                })
                .catch(() => {
                  reject('Connection error.');
                }); 
            } else {
              reject('Name taken!');            
            }
          }) 
          .catch(() => {
            reject('Connection error.');
          });
      } else { 
        reject('Name & Directory paths required.'); 
      }
    });
  }
};
