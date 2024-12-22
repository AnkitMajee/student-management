import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { Layout } from './components/layout/Layout';
import { StudentList } from './components/students/StudentList';

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <StudentList />
      </Layout>
    </Provider>
  );
}

export default App;