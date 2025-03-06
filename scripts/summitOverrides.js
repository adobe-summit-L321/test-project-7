import { getConfigValue } from './configs.js';

const dealerships = ['kingsbluff', 'arkbridge', 'celport'];
const getDealershipName = async () => (await getConfigValue('dealer-name')).toLowerCase();

const hideMainPictures = async (dealshipName, main) => {
  const mainPictures = main.querySelectorAll('picture');
  // arkbridge (0), kingsbluff (1), celport (2)

  switch (dealshipName) {
    case 'arkbridge':
      mainPictures[1].style.display = 'none';
      mainPictures[2].style.display = 'none';
      break;
    case 'kingsbluff':
      mainPictures[0].style.display = 'none';
      mainPictures[2].style.display = 'none';
      break;
    case 'celport':
      mainPictures[0].style.display = 'none';
      mainPictures[1].style.display = 'none';
      break;
    default:
      // show all pictures
      mainPictures[0].style.display = null;
      mainPictures[1].style.display = null;
      mainPictures[2].style.display = null;
  }
};

const hideBrandContent = async (dealshipName, main) => {
  const columnsSections = main.querySelector("div[data-block-name='columns']");
  const brandContentSections = columnsSections.querySelectorAll('div');
  // arora (0), bolt (3), cruz (6)

  switch (dealshipName) {
    case 'kingsbluff':
    case 'celport':
      // show bolt (3) and cruz (6)
      brandContentSections[0].style.display = 'none';
      break;
    case 'arkbridge':
    default:
      // show all sections
      brandContentSections[0].style.display = null;
      brandContentSections[3].style.display = null;
      brandContentSections[6].style.display = null;
      break;
  }
};

const summitOverrides = async (main) => {
  // only run on the index page
  if (window.location.pathname !== '/') return main;

  const dealershipName = await getDealershipName();

  if (dealerships.includes(dealershipName)) {
    // search through main and show/hide elements based on the dealership
    await hideMainPictures(dealershipName, main);
    await hideBrandContent(dealershipName, main);
  }

  return main;
};

export default summitOverrides;
