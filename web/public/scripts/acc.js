const url = new URL(location.href);
var token = url.searchParams.get('token');
if (token !== null & sessionStorage.getItem('JABdiscordToken') !== null) {
    location.href = '/account';
}
if (token === null) {
    if (sessionStorage.getItem('JABdiscordToken') === null) {
        location.href = '/login';
    } else {
        token = sessionStorage.getItem('JABdiscordToken');
    }
} 
var data = null;
