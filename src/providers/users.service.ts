const API_URL = 'https://reqres.in';

export async function listUsers(page: number = 1, perPage: number = 6) {
  const fetchTarget = new URL('/api/users', API_URL);
  fetchTarget.search = `page=${page}&per_page=${perPage}`;

  const fetchOptions: RequestInit = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  };

  const response = await fetch(fetchTarget, fetchOptions);

  if (response.ok === false) {
    throw new Error(response.statusText);
  }

  return response;
}

export async function getUser(id: string) {
  const fetchTarget = new URL(`/api/users/${id}`, API_URL);

  const fetchOptions: RequestInit = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  };

  const response = await fetch(fetchTarget, fetchOptions);

  if (response.ok === false) {
    throw new Error(response.statusText);
  }

  return response;
}

export async function createUser(user: User) {
  const fetchTarget = new URL('/api/users', API_URL);

  const fetchOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };

  const response = await fetch(fetchTarget, fetchOptions);

  if (response.ok === false) {
    throw new Error(response.statusText);
  }

  return response;
}

export async function updateUser(id: string, user: User) {
  const fetchTarget = new URL(`/api/users/${id}`, API_URL);

  const fetchOptions: RequestInit = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };

  const response = await fetch(fetchTarget, fetchOptions);

  if (response.ok === false) {
    throw new Error(response.statusText);
  }

  return response;
}

export async function deleteUser(id: string) {
  const fetchTarget = new URL(`/api/users/${id}`, API_URL);

  const fetchOptions: RequestInit = {
    method: 'DELETE',
  };

  const response = await fetch(fetchTarget, fetchOptions);

  if (response.ok === false) {
    throw new Error(response.statusText);
  }

  return response;
}
