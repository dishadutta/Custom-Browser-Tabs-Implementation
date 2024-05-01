$(document).ready(function () {
  const tabsList = $('#tabs-list')
  const contentContainer = $('#content-container')

  // Function to switch to a particular tab
  function switchToTab(index) {
    $('.tab, .content').removeClass('active')
    $(`.tab:eq(${index}), .content:eq(${index})`).addClass('active')
  }

  // Handle adding a new tab
  $('#add-tab').on('click', function () {
    let tabCount = tabsList.children('li').not('#add-tab').length
    const newTab = $(
      `<li class="tab"><span>Tab ${
        tabCount + 1
      }</span><button class="close">×</button></li>`
    )
    newTab.insertBefore('#add-tab')
    const newContent = $(
      `<div class="content"><input class="input-button" type="text" placeholder="Enter URL and press Enter"><iframe src="about:blank" frameborder="0"></iframe></div>`
    )
    contentContainer.append(newContent)
    switchToTab(tabCount) // Switch to the newly added tab
  })

  // Handle clicking on a tab (not the close button)
  $(document).on('click', '.tab span', function () {
    let index = $(this).parent().index() // Get the index of the parent li element
    index = index - $('#tabs-list > li').index($('#add-tab')) // Adjust for the position of the "+" tab
    switchToTab(index)
  })

  // Handle closing a tab
  $(document).on('click', '.close', function () {
    const parentIndex = $(this).parent().index()
    const adjustmentIndex =
      parentIndex - $('#tabs-list > li').index($('#add-tab'))
    $(this).parent().remove()
    $(contentContainer.children().get(adjustmentIndex)).remove()
    // Fallback to the nearest tab if the current active tab is closed
    if (!$('.tab.active').length && $('.tab').length > 0) {
      switchToTab(Math.max(0, adjustmentIndex - 1))
    }
  })

  // Handle loading URL into iframe when Enter is pressed in the input field
  $(document).on('keydown', 'input', function (e) {
    if (e.key === 'Enter') {
      let url = $(this).val()
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url // Assume HTTPS if protocol not specified
      }
      $(this).next('iframe').attr('src', url)
    }
  })
})
