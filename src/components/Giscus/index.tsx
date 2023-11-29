import {
  DiscordIcon,
  Giscus as G,
  GradientButton,
  Icon,
  Modal,
  type ModalProps,
} from '@lobehub/ui';
import { Button } from 'antd';
import { useTheme } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { Github } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Center, Flexbox } from 'react-layout-kit';

import { homepage } from '@/../package.json';
import VersionTag from '@/components/VersionTag';
import { selectors, useAppStore } from '@/store';

export interface GiscusProps {
  onCancel?: ModalProps['onCancel'];
  open?: ModalProps['open'];
}

const repoName = homepage.replace('https://github.com/', '') as `${string}/${string}`;

const Giscus = memo<GiscusProps>(({ open, onCancel }) => {
  const setting = useAppStore(selectors.currentSetting, isEqual);
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Modal
      footer={false}
      onCancel={onCancel}
      open={open}
      title={
        <Flexbox align={'center'} gap={4} horizontal>
          {t('modal.themeFeedback.title')}
          <VersionTag />
        </Flexbox>
      }
    >
      <Flexbox gap={32}>
        <Center
          gap={16}
          horizontal
          style={{
            background: theme.colorBgLayout,
            border: `1px solid ${theme.colorBorderSecondary}`,
            borderRadius: theme.borderRadiusLG,
            padding: '16px 0',
          }}
        >
          <a href={'https://discord.gg/AYFPHvv2jT'} rel="noreferrer" target="_blank">
            <Button icon={<Icon icon={DiscordIcon} />} size={'large'}>
              Join Discover
            </Button>
          </a>
          <a href={homepage} rel="noreferrer" target="_blank">
            <GradientButton icon={<Icon icon={Github} />}>LobeTheme Github</GradientButton>
          </a>
        </Center>
        <G lang={setting.i18n} mapping="number" repo={repoName} repoId="R_kgDOJCPcNg" term="53" />
      </Flexbox>
    </Modal>
  );
});

export default Giscus;
