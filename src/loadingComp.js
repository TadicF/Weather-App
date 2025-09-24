export const loadingController = {
  loadingWrapper: document.querySelector('.loadingWrapper'),
  weatherWrapper: document.querySelector('.weatherWrapper'),
  show: () => { displayLoading() },
  hide: () => { hideLoading() },
}

function displayLoading() {
  loadingController.loadingWrapper.style.display = 'flex';
  loadingController.weatherWrapper.style.display = 'none';
};

function hideLoading() {
  loadingController.loadingWrapper.style.display = 'none';
  loadingController.weatherWrapper.style.display = 'flex';
}