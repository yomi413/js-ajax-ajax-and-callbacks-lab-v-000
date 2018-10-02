// $(document).ready(function (){
// });

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

const searchResult = result => {
  return `
    <div>
      <h2><a href="${result.html_url}">${result.name}</a></h2>
      <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
      <p>${result.description}</p>
    </div>
    <hr>
  `;
}

const manySearchResults = data => data.items.map(result => searchResult(result));

function searchRepositories() {
  let search = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${search}`, data => {
    $('#results').html(manySearchResults(data))
  }).fail(error => {
    displayError()
  })
}

function showCommits(repo) {
  $.get(`https://api.github.com/repos/${repo.dataset.owner}/${repo.dataset.repository}/commits`, data => {
    $('#details').html(manyCommits(data))
  }).fail(error => {
    displayError()
  })
}

function manyCommits(data) {
  let result = data.map(commit => oneCommit(commit)).join('')
  return `<ul>${result}</ul>`
}

function oneCommit(commit) {
  return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
}
