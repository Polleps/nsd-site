import type { HeaderData } from '../helpers/server/cms';
import type { Tournament } from '../types/Tournament';
import { DiscordInvite } from './DiscordInvite';
import { Container } from './lib/Container';
import { NavBar } from './NavBar';
import { TournamentList } from './tournamentlist/TournamentList';
import styles from './Header.module.css';

export interface HeaderProps {
  tournaments: Tournament[];
  cmsData: HeaderData;
}

export const Header: React.FC<HeaderProps> = ({ tournaments, cmsData }) => (
  <header className={styles.header}>
    <Container className={styles.headerContainer} size="large">
      <div className={styles.headerContent}>
        <div className={styles.textWrapper}>
          <h1>{cmsData.header.pageTitle}</h1>
          <p>{cmsData.header.headerParagraph}</p>
        </div>
        <div className={styles.discordInviteWrapper}>
          <DiscordInvite />
        </div>
        <div className={styles.tournamentsWrapper}>
          <TournamentList tournaments={tournaments} />
        </div>
      </div>
    </Container>
    <div className={styles.navWrapper}>
      <NavBar />
    </div>
  </header>
);
