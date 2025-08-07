import { useQuery } from '@tanstack/react-query';
import { ApiService, HTTPMethod } from '../api/apiService';

interface TitleExistsResponse {
  exists: boolean;
}

const checkTitleExists = async (title: string): Promise<TitleExistsResponse> => {
  return ApiService.makeRequest<TitleExistsResponse>(
    `/movies/check-title?title=${encodeURIComponent(title)}`,
    HTTPMethod.GET
  );
};

export const useCheckTitleExists = (title: string) => {
  return useQuery<TitleExistsResponse, Error>({
    queryKey: ['checkTitleExists', title],
    queryFn: () => checkTitleExists(title),
    enabled: !!title && title.length >= 2, // Only check if title has at least 2 characters
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 1, // Only retry once
  });
};
