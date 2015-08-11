import Crossing from 'crossing';
import urlTable from '../containers/urlTable';
const urls = new Crossing(new RegExp(':([A-Za-z0-9-_%]{1,})'));
urls.load(urlTable);
export default urls;
