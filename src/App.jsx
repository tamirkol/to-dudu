import { useState } from 'react'
import { AppHeader } from './cmps/AppHeader'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { AppFooter } from './cmps/AppFooter'
import { HomePage } from './pages/HomePage'
import { TodoIndex } from './pages/TodoIndex'
import { store } from './store/store.js'
import { TodoEdit } from './pages/TodoEdit.jsx'

function App() {

  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout app">
          <AppHeader />
          <main className='main-layout-container'>
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<TodoIndex />} path="/todo" />
              <Route element={<TodoEdit />} path="/todo/edit/:todoId" />
            </Routes>
          </main>
          <AppFooter />
        </section>
      </Router>
    </Provider>
  )
}

export default App
