import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'

import HomePage from './routes/Home/HomePage.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WorksPage from './routes/Works/WorksPage.jsx';
import ServicesPage from './routes/Services/ServicesPage.jsx';
import TermsAndConditions from './routes/Terms/TermsAndConditions.jsx';
import PageNotFound from './routes/PageNotFound/PageNotFound.jsx';
import ContactsPage from './routes/Contacts/ContactsPage.jsx';
import AboutPage from './routes/About/AboutPage.jsx';
import CareersPage from './routes/Careers/CareersPage.jsx';
import BlogPage from './routes/Blog/BlogPage.jsx';
import JobsPostingPage from './routes/JobsPosting/JobsPostingPage.jsx';
import Root from './components/Root.jsx';
import Articles from './routes/Articles/Articles.jsx';
import ServicePage from './routes/Service/ServicePage.jsx';
import WorkPage from './routes/Work/WorkPage.jsx';
import ShowModalBox from './components/ShowModalBox.jsx';
import { ModalBoxesProvider } from './components/useModalBoxesContext.jsx';
import { SEOProvider } from './contexts/SEOContext.jsx';
import { TranslationProvider } from './contexts/TranslationContext.jsx';
import { BlogProvider } from './contexts/BlogContext.jsx';
import { ServicesProvider } from './contexts/ServicesContext.jsx';
import { WorksProvider } from './contexts/WorksContext.jsx';

const router = createBrowserRouter([
  {
    element: <ShowModalBox />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "*",
        element: <PageNotFound />,
      },
      {
        path: "/", // Routes with white headerTextColor
        element: <Root headerTextColor="white" />,
        errorElement: <PageNotFound />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "works/:workId",
            element: <WorkPage />,
          },
        ],
      },
      {
        path: "/:lang", // Language routes with white headerTextColor
        element: <Root headerTextColor="white" />,
        errorElement: <PageNotFound />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "works/:workId",
            element: <WorkPage />,
          },
        ],
      },
      {
        path: "/", // Routes with black headerTextColor
        element: <Root headerTextColor="black" />,
        errorElement: <PageNotFound />,
        children: [
          {
            path: "blogs/:blogId",
            element: <Articles />,
          },
          {
            path: "works",
            element: <WorksPage />,
          },
          {
            path: "about",
            element: <AboutPage />,
          },
          {
            path: "contacts",
            element: <ContactsPage />,
          },
          {
            path: "services",
            element: <ServicesPage />,
          },
          {
            path: "terms_conditions",
            element: <TermsAndConditions />,
          },
          {
            path: "careers",
            element: <CareersPage />,
          },
          {
            path: "blogs",
            element: <BlogPage />,
          },
          {
            path: "services/:serviceId",
            element: <ServicePage />,
          },
          {
            path: "careers/:jobId",
            element: <JobsPostingPage />,
          },
        ],
      },
      {
        path: "/:lang", // Language routes with black headerTextColor
        element: <Root headerTextColor="black" />,
        errorElement: <PageNotFound />,
        children: [
          {
            path: "blogs/:blogId",
            element: <Articles />,
          },
          {
            path: "works",
            element: <WorksPage />,
          },
          {
            path: "about",
            element: <AboutPage />,
          },
          {
            path: "contacts",
            element: <ContactsPage />,
          },
          {
            path: "services",
            element: <ServicesPage />,
          },
          {
            path: "terms_conditions",
            element: <TermsAndConditions />,
          },
          {
            path: "careers",
            element: <CareersPage />,
          },
          {
            path: "blogs",
            element: <BlogPage />,
          },
          {
            path: "services/:serviceId",
            element: <ServicePage />,
          },
          {
            path: "careers/:jobId",
            element: <JobsPostingPage />,
          },
        ],
      },
    ],
  },
]);





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <SEOProvider>
        <TranslationProvider>
          <BlogProvider>
            <ServicesProvider>
              <WorksProvider>
                <ModalBoxesProvider>
                  <RouterProvider router={router} />
                </ModalBoxesProvider>
              </WorksProvider>
            </ServicesProvider>
          </BlogProvider>
        </TranslationProvider>
      </SEOProvider>
    </HelmetProvider>
  </StrictMode>,
)
