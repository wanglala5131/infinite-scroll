import axios from 'axios';

export const getRepositories = ({
  orgName,
  type = 'all',
  sort = 'created',
  direction = 'asc',
  page = 1,
}) => {
  return axios({
    method: 'get',
    url: `https://api.github.com/orgs/${orgName}/repos`,
    params: {
      type,
      sort,
      direction,
      page,
    },
  })
    .then(res => res.data)
    .catch(err => Promise.reject(err.response));
};
