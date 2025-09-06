import React, { createContext, useContext, useReducer } from 'react';

const initialData = {
  categories: [
    {
      id: 'cspm',
      name: 'CSPM Executive Dashboard',
      widgets: [
        {
          id: 'widget-1',
          name: 'Cloud Accounts ',
          text: 'Total: 2\nConnected: 1\nNot Connected: 1'
        },
        {
          id: 'widget-2',
          name: 'Cloud Account Risk Assessment',
          text: 'Failed: 1689 (36%)\nWarning: 681 (14%)\nNot available: 36 (1%)\nPassed: 7253 (49%)'
        }
      ]
    },
    {
      id: 'cwpp',
      name: 'CWPP Dashboard',
      widgets: [
        {
          id: 'widget-3',
          name: 'Top 5 Namespace Specific Alerts',
          text: 'No Graph data available!'
        },
        {
          id: 'widget-4',
          name: 'Workload Alerts',
          text: 'No Graph data available!'
        }
      ]
    },
    {
      id: 'registry',
      name: 'Registry Scan',
      widgets: [
        {
          id: 'widget-5',
          name: 'Image Risk Assessment',
          text: 'Total Vulnerabilities: 1470\nCritical: 9\nHigh: 150'
        },
        {
          id: 'widget-6',
          name: 'Image Security Issues',
          text: 'Critical: 2\nHigh: 2\nMedium: 8\nLow: 0'
        }
      ]
    }
  ],
  searchTerm: ''
};

const ACTIONS = {
  ADD_WIDGET: 'ADD_WIDGET',
  REMOVE_WIDGET: 'REMOVE_WIDGET',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM'
};

function dashboardReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_WIDGET:
      return {
        ...state,
        categories: state.categories.map(category =>
          category.id === action.payload.categoryId
            ? {
                ...category,
                widgets: [...category.widgets, action.payload.widget]
              }
            : category
        )
      };

    case ACTIONS.REMOVE_WIDGET:
      return {
        ...state,
        categories: state.categories.map(category => ({
          ...category,
          widgets: category.widgets.filter(widget => widget.id !== action.payload.widgetId)
        }))
      };

    case ACTIONS.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload
      };

    default:
      return state;
  }
}

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialData);
  const addWidget = (categoryId, widget) => {
    dispatch({
      type: ACTIONS.ADD_WIDGET,
      payload: { categoryId, widget }
    });
  };

  const removeWidget = (widgetId) => {
    dispatch({
      type: ACTIONS.REMOVE_WIDGET,
      payload: { widgetId }
    });
  };

  const setSearchTerm = (term) => {
    dispatch({
      type: ACTIONS.SET_SEARCH_TERM,
      payload: term
    });
  };

  const getFilteredCategories = () => {
    if (!state.searchTerm) {
      return state.categories;
    }

    return state.categories.map(category => ({
      ...category,
      widgets: category.widgets.filter(widget =>
        widget.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        widget.text.toLowerCase().includes(state.searchTerm.toLowerCase())
      )
    }));
  };

  const value = {
    categories: state.categories,
    searchTerm: state.searchTerm,
    filteredCategories: getFilteredCategories(),
    addWidget,
    removeWidget,
    setSearchTerm
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}