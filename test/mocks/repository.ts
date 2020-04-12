export const mockRepository = (result: any) => ({
	exec: jest.fn().mockReturnValue(result)
});
