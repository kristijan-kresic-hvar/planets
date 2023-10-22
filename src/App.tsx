import Button from '@components/Button';

const App = () => {
  return (
    <div className="App">
      <Button buttonNumber={1} onClick={() => console.log('clicked')}>
        Button
      </Button>
      <Button buttonNumber={1} onClick={() => console.log('clicked')}>
        Button
      </Button>
      <Button buttonNumber={1} onClick={() => console.log('clicked')}>
        Button
      </Button>
    </div>
  );
};

export default App;
