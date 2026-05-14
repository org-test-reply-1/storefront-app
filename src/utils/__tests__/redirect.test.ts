import { sanitizeRedirectUrl } from '../redirect';

const FALLBACK = '/fallback';

describe('sanitizeRedirectUrl', () => {
  describe('valid relative paths', () => {
    test('returns the path unchanged for a normal relative URL', () => {
      expect(sanitizeRedirectUrl('/app/dashboard', FALLBACK)).toBe(
        '/app/dashboard',
      );
    });

    test('returns a root path unchanged', () => {
      expect(sanitizeRedirectUrl('/', FALLBACK)).toBe('/');
    });

    test('returns a nested path unchanged', () => {
      expect(sanitizeRedirectUrl('/app/discussions/123', FALLBACK)).toBe(
        '/app/discussions/123',
      );
    });

    test('preserves query strings on relative paths', () => {
      expect(sanitizeRedirectUrl('/app?foo=bar', FALLBACK)).toBe(
        '/app?foo=bar',
      );
    });
  });

  describe('null / undefined / empty inputs', () => {
    test('returns fallback for null', () => {
      expect(sanitizeRedirectUrl(null, FALLBACK)).toBe(FALLBACK);
    });

    test('returns fallback for undefined', () => {
      expect(sanitizeRedirectUrl(undefined, FALLBACK)).toBe(FALLBACK);
    });

    test('returns fallback for empty string', () => {
      expect(sanitizeRedirectUrl('', FALLBACK)).toBe(FALLBACK);
    });
  });

  describe('absolute URLs', () => {
    test('rejects https:// URLs', () => {
      expect(sanitizeRedirectUrl('https://evil.com', FALLBACK)).toBe(FALLBACK);
    });

    test('rejects http:// URLs', () => {
      expect(sanitizeRedirectUrl('http://evil.com', FALLBACK)).toBe(FALLBACK);
    });

    test('rejects ftp:// URLs', () => {
      expect(sanitizeRedirectUrl('ftp://evil.com', FALLBACK)).toBe(FALLBACK);
    });
  });

  describe('dangerous protocol schemes', () => {
    test('rejects javascript: scheme', () => {
      expect(sanitizeRedirectUrl('javascript:alert(1)', FALLBACK)).toBe(
        FALLBACK,
      );
    });

    test('rejects data: scheme', () => {
      expect(
        sanitizeRedirectUrl('data:text/html,<script>evil</script>', FALLBACK),
      ).toBe(FALLBACK);
    });

    test('rejects vbscript: scheme', () => {
      expect(sanitizeRedirectUrl('vbscript:msgbox(1)', FALLBACK)).toBe(
        FALLBACK,
      );
    });
  });

  describe('protocol-relative URLs', () => {
    test('rejects //evil.com', () => {
      expect(sanitizeRedirectUrl('//evil.com', FALLBACK)).toBe(FALLBACK);
    });

    test('rejects //evil.com/path', () => {
      expect(sanitizeRedirectUrl('//evil.com/path', FALLBACK)).toBe(FALLBACK);
    });
  });

  describe('paths without a leading slash', () => {
    test('rejects a bare relative path', () => {
      expect(sanitizeRedirectUrl('dashboard', FALLBACK)).toBe(FALLBACK);
    });

    test('rejects a path starting with ../', () => {
      expect(sanitizeRedirectUrl('../evil', FALLBACK)).toBe(FALLBACK);
    });
  });
});
