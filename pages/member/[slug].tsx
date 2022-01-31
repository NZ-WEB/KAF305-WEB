import { Skeleton } from '@mui/material';
import { withLayout } from '../../layout/Layout';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MembersService from '../../service/members/members.service';
import { MembersInterface } from '../../interfaces/members.interface';
import { AppContext } from '../../context';
import * as React from 'react';
import { AppProfileCard } from '../../src/components';
import { AppErrors } from '../../src/components/AppErrors/AppErrors';

const MemberPage = (): JSX.Element => {
  const [member, setMember] = useState<null | MembersInterface>(null);
  const [errors, setErrors] = useState([]);
  const { auth } = useContext(AppContext);
  const router = useRouter();
  const membersService = new MembersService();
  const slug = router.query.slug?.toString();

  useEffect(() => {
    if (process.browser && slug) {
      membersService
        .getBySlug(slug)
        .then((member) => setMember(member))
        .catch((e) => setErrors([...errors, e]));
    }
  }, [slug]);

  return member ? (
    <div>
      {errors.length > 0 && <AppErrors errors={errors} />}

      <AppProfileCard
        member={member}
        setMember={setMember}
        auth={auth}
        errors={errors}
        setErrors={setErrors}
      />
    </div>
  ) : (
    <>
      <Skeleton variant="text" />
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={118} />
    </>
  );
};

export default withLayout(MemberPage);
