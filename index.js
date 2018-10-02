$(document).ready(function (){
});

function searchRepositories(searchTerms) {
  let search = $('#searchTerms').val()

  $.get(`https://api.github.com/search/repositories?q=${search}`, data => {
    $('#results').html(renderSearchResults(data))
  }).fail(error => {
    displayError()
  })
}

function renderSearchResults(data) {
  return data.items.map(result => renderSearchResult(result))
}

function renderSearchResult(result) {
  return
      `<div>
        <h2><a href="${result.html_url}">${result.name}</a></h2>
        <p><a href="#" data-repository="${result.name}" data-owner="${result.owner.login}" onclick="showCommits(this)">Show Commits</a></p>
        <p>${result.description ? result.description : ''}</p>
      </div>`
}

function displayError() {
  $('#errors').html("I'm sorry, there's been an error. Please try again.")
}

function showCommits(repo) {
  $.get(`https://api.github.com/search/repos/${repo.dataset.owner}/${repo.dataset.repository}`, data => {
    $('#details').html(commits(data))
  }).fail(error => {
    displayError()
  })
}

function commits(data) {
  return data.items.map(detail => commit(detail))
}

function commit() {

}
