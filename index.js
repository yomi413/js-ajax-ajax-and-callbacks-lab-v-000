// $(document).ready(function (){
// });

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

const renderSearchResult = result => {
  return `
      <div>
        <h2><a href="${result.html_url}">${result.name}</a></h2>
        <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        <p>${result.description ? result.description : ''}</p>
      </div>
      <hr>
    `;
}

const renderSearchResults = data => data.items.map(result => renderSearchResult(result));

// function renderSearchResult(result) {
//   return
//     `<div>
//       <h2><a href="${result.html_url}">${result.name}</a></h2>
//       <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
//       <p>${result.description}</p>
//     </div><hr>`
// }
//
// function renderSearchResults(data) {
//   return data.items.map(result => renderSearchResult(result))
// }

function searchRepositories() {
  let search = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${search}`, data => {
    $('#results').html(renderSearchResults(data))
  }).fail(error => {
    displayError()
  })
}

function showCommits(repo) {
  $.get(`https://api.github.com/repos/${repo.dataset.owner}/${repo.dataset.repository}/commits`, data => {
    $('#details').html(renderCommits(data))
  }).fail(error => {
    displayError()
  })
}

function renderCommits(data) {
  let result = data.map(commit => renderCommit(commit)).join('')
  return `<ul>${result}</ul>`
}

function renderCommit(commit) {
  return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
}
