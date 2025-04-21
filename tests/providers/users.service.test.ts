import {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../../src/providers/users.service';

// Import User type from types file
import '../../src/types/users.d.ts';

// Mock global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Helper to create mock response
const mockResponse = (status: number, statusText: string, data: unknown) => {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText,
    json: jest.fn().mockResolvedValue(data),
  };
};

describe('User Service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('listUsers', () => {
    it('should fetch users with default pagination', async () => {
      const mockData = {
        page: 1,
        per_page: 6,
        total: 12,
        data: [{ id: 1, email: 'test@example.com' }],
      };
      const mockResp = mockResponse(200, 'OK', mockData);
      mockFetch.mockResolvedValueOnce(mockResp);

      const result = await listUsers();

      expect(mockFetch).toHaveBeenCalledWith(
        expect.objectContaining({
          href: expect.stringMatching(/.*\/api\/users\?page=1&per_page=6/),
        }),
        expect.objectContaining({
          method: 'GET',
          headers: { Accept: 'application/json' },
        }),
      );
      expect(result).toBe(mockResp);
    });

    it('should fetch users with custom pagination', async () => {
      const mockData = {
        page: 2,
        per_page: 10,
        total: 20,
        data: [{ id: 11, email: 'user11@example.com' }],
      };
      const mockResp = mockResponse(200, 'OK', mockData);
      mockFetch.mockResolvedValueOnce(mockResp);

      const result = await listUsers(2, 10);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.objectContaining({
          href: expect.stringMatching(/.*\/api\/users\?page=2&per_page=10/),
        }),
        expect.any(Object),
      );
      expect(result).toBe(mockResp);
    });

    it('should throw error when fetch fails', async () => {
      mockFetch.mockResolvedValueOnce(mockResponse(404, 'Not Found', null));

      await expect(listUsers()).rejects.toThrow('Not Found');
    });
  });

  describe('getUser', () => {
    it('should fetch a single user by id', async () => {
      const mockData = {
        data: {
          id: 1,
          email: 'test@example.com',
          first_name: 'Test',
          last_name: 'User',
        },
      };
      const mockResp = mockResponse(200, 'OK', mockData);
      mockFetch.mockResolvedValueOnce(mockResp);

      const result = await getUser('1');

      expect(mockFetch).toHaveBeenCalledWith(
        expect.objectContaining({
          href: expect.stringMatching(/.*\/api\/users\/1/),
        }),
        expect.objectContaining({
          method: 'GET',
          headers: { Accept: 'application/json' },
        }),
      );
      expect(result).toBe(mockResp);
    });

    it('should throw error when fetch fails', async () => {
      mockFetch.mockResolvedValueOnce(
        mockResponse(404, 'User Not Found', null),
      );

      await expect(getUser('999')).rejects.toThrow('User Not Found');
    });
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const newUser: User = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
      };

      const mockData = {
        id: 101,
        ...newUser,
        createdAt: new Date().toISOString(),
      };
      const mockResp = mockResponse(201, 'Created', mockData);
      mockFetch.mockResolvedValueOnce(mockResp);

      const result = await createUser(newUser);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.objectContaining({
          href: expect.stringMatching(/.*\/api\/users/),
        }),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser),
        }),
      );
      expect(result).toBe(mockResp);
    });

    it('should throw error when fetch fails', async () => {
      const invalidUser: User = { email: 'invalid' };
      mockFetch.mockResolvedValueOnce(mockResponse(400, 'Bad Request', null));

      await expect(createUser(invalidUser)).rejects.toThrow('Bad Request');
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const userId = '1';
      const updatedUser: User = {
        first_name: 'Updated',
        last_name: 'User',
      };

      const mockData = {
        id: 1,
        ...updatedUser,
        updatedAt: new Date().toISOString(),
      };
      const mockResp = mockResponse(200, 'OK', mockData);
      mockFetch.mockResolvedValueOnce(mockResp);

      const result = await updateUser(userId, updatedUser);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.objectContaining({
          href: expect.stringMatching(/.*\/api\/users\/1/),
        }),
        expect.objectContaining({
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedUser),
        }),
      );
      expect(result).toBe(mockResp);
    });

    it('should throw error when fetch fails', async () => {
      const userId = '999';
      const updatedUser: User = { first_name: 'Updated' };
      mockFetch.mockResolvedValueOnce(
        mockResponse(404, 'User Not Found', null),
      );

      await expect(updateUser(userId, updatedUser)).rejects.toThrow(
        'User Not Found',
      );
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const userId = '1';
      const mockResp = mockResponse(204, 'No Content', null);
      mockFetch.mockResolvedValueOnce(mockResp);

      const result = await deleteUser(userId);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.objectContaining({
          href: expect.stringMatching(/.*\/api\/users\/1/),
        }),
        expect.objectContaining({
          method: 'DELETE',
        }),
      );
      expect(result).toBe(mockResp);
    });

    it('should throw error when fetch fails', async () => {
      const userId = '999';
      mockFetch.mockResolvedValueOnce(
        mockResponse(404, 'User Not Found', null),
      );

      await expect(deleteUser(userId)).rejects.toThrow('User Not Found');
    });
  });
});
