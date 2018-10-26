const url = new URL(location.href);
const token = url.searchParams.get('token');
if (token === null) {
    location.href = '/login';
}