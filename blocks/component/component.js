import { loadScript } from '../../scripts/aem.js';

const getVicPagination = () => {
  // <vic-m-pagination class="vic-m-pagination" initial-page="1" page-count="10"></vic-m-pagination>
  const pagination = document.createElement('vic-m-pagination');
  pagination.classList.add('vic-m-pagination');
  pagination.setAttribute('initial-page', '1');
  pagination.setAttribute('page-count', '10');

  return pagination;
};

export default async function decorate(block) {
  await loadScript('../../frontend/target/js/vic.app.js', { type: 'text/javascript'});
  const vicPagination = getVicPagination();

  block.textContent = '';
  block.append(vicPagination);
}
