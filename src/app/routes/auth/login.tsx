import { useNavigate, useSearchParams } from 'react-router';

import { AuthLayout } from '@/components/layouts/auth-layout';
import { paths } from '@/config/paths';
import { LoginForm } from '@/features/auth/components/login-form';
import { sanitizeRedirectUrl } from '@/utils/redirect';

const LoginRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = sanitizeRedirectUrl(
    searchParams.get('redirectTo'),
    paths.app.dashboard.getHref(),
  );

  return (
    <AuthLayout title="Log in to your account">
      <LoginForm
        onSuccess={() => {
          navigate(redirectTo, {
            replace: true,
          });
        }}
      />
    </AuthLayout>
  );
};

export default LoginRoute;
