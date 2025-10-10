let _isRefreshing = false;
let refreshSubscribers: ((token?: string) => void)[] = [];

// getter
export function getIsRefreshing() {
  return _isRefreshing;
}

// setter
export function setIsRefreshing(value: boolean) {
  _isRefreshing = value;
}

// 큐 등록
export function subscribeTokenRefresh(callback: (token?: string) => void) {
  refreshSubscribers.push(callback);
}

// 큐 실행
export function onRefreshed(token?: string) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}
