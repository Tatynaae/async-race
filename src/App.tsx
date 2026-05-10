import { useAppSelector } from './store/hooks';
import { GarageView } from './components/GarageView';
import { Navigation } from './components/Navigation';
import { WinnersView } from './components/WinnersView';
import './App.css';

const App = () => {
  const view = useAppSelector((s) => s.ui.activeView);

  return (
    <div className="app">
      <header className="app__shell">
        <div className="app__brand">
          <span className="app__logo">⚡</span>
          <div>
            <p className="app__title">Async Race Control</p>
            <p className="app__subtitle">Garage, telemetry, podium</p>
          </div>
        </div>
        <Navigation />
      </header>
      <main className="app__main">{view === 'garage' ? <GarageView /> : <WinnersView />}</main>
    </div>
  );
};

export default App;
