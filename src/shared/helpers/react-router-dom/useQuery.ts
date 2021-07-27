// A custom hook that builds on useLocation to parse

import { useLocation } from 'react-router-dom';

// the query string for you.
export function useQuery() {
    return new URLSearchParams(useLocation().search);
}
