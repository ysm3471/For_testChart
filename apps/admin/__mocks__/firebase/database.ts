export const getDatabase = jest.fn(() => "mockDb");
export const query = jest.fn(() => "callDb")
export const ref = jest.fn((_db, path) => ({ db: _db, path }));
export const onValue = jest.fn(() => "result")