import React from 'react';
import { X } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import DoughnutChart from '../charts/DoughnutChart';
import BarChart from '../charts/BarChart';
import chartPlaceholder from '../../assets/chart-placeholder.svg';

// Color palette for charts
const chartColors = {
  red: '#FF6384',
  orange: '#FF9F40',
  yellow: '#FFCD56',
  green: '#4BC0C0',
  blue: '#36A2EB',
  purple: '#9966FF',
  grey: '#C9CBCF'
};

function Widget({ widget }) {
  const { removeWidget } = useDashboard();

  const handleRemove = (e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to remove "${widget.name}"?`)) {
      removeWidget(widget.id);
    }
  };

  // Parse widget data based on widget type
  const parseWidgetData = () => {
    const widgetName = widget.name.trim(); // Trim whitespace from widget name
    switch(widgetName) {
      case 'Cloud Accounts':
        return { type: 'doughnut', data: parseCloudAccountsData() };
      case 'Cloud Account Risk Assessment':
        return { type: 'doughnut', data: parseRiskAssessmentData() };
      case 'Image Risk Assessment':
        return { type: 'bar', data: parseImageRiskBarData() };
      case 'Image Security Issues':
        return { type: 'bar', data: parseSecurityIssuesData() };
      default:
        return { type: 'doughnut', data: null };
    }
  };

  const parseCloudAccountsData = () => {
    const totalMatch = widget.text.match(/Total: (\d+)/);
    const connectedMatch = widget.text.match(/Connected: (\d+)/);
    const notConnectedMatch = widget.text.match(/Not Connected: (\d+)/);
    
    const connected = connectedMatch ? parseInt(connectedMatch[1]) : 0;
    const notConnected = notConnectedMatch ? parseInt(notConnectedMatch[1]) : 0;
    
    return {
      labels: ['Connected', 'Not Connected'],
      datasets: [{
        data: [connected, notConnected],
        backgroundColor: [chartColors.green, chartColors.red],
        borderWidth: 1,
      }],
      text: `Total: ${connected + notConnected}`
    };
  };

  const parseRiskAssessmentData = () => {
    const failedMatch = widget.text.match(/Failed: (\d+)/);
    const warningMatch = widget.text.match(/Warning: (\d+)/);
    const notAvailableMatch = widget.text.match(/Not available: (\d+)/);
    const passedMatch = widget.text.match(/Passed: (\d+)/);
    
    const failed = failedMatch ? parseInt(failedMatch[1]) : 0;
    const warning = warningMatch ? parseInt(warningMatch[1]) : 0;
    const notAvailable = notAvailableMatch ? parseInt(notAvailableMatch[1]) : 0;
    const passed = passedMatch ? parseInt(passedMatch[1].match(/\d+/)[0]) : 0;
    
    return {
      labels: ['Failed', 'Warning', 'Not Available', 'Passed'],
      datasets: [{
        data: [failed, warning, notAvailable, passed],
        backgroundColor: [
          chartColors.red,
          chartColors.orange,
          chartColors.grey,
          chartColors.green
        ],
        borderWidth: 1,
      }]
    };
  };

  const parseImageRiskData = () => {
    const criticalMatch = widget.text.match(/Critical: (\d+)/);
    const highMatch = widget.text.match(/High: (\d+)/);
    const totalMatch = widget.text.match(/Total Vulnerabilities: (\d+)/);
    
    const critical = criticalMatch ? parseInt(criticalMatch[1]) : 0;
    const high = highMatch ? parseInt(highMatch[1]) : 0;
    const total = totalMatch ? parseInt(totalMatch[1]) : 0;
    const others = Math.max(0, total - critical - high);
    
    return {
      labels: ['Critical', 'High', 'Others'],
      datasets: [{
        data: [critical, high, others],
        backgroundColor: [chartColors.red, chartColors.orange, chartColors.yellow],
        borderWidth: 1,
      }],
      text: `Total: ${total}`
    };
  };

  const parseSecurityIssuesData = () => {
    const criticalMatch = widget.text.match(/Critical: (\d+)/);
    const highMatch = widget.text.match(/High: (\d+)/);
    const mediumMatch = widget.text.match(/Medium: (\d+)/);
    const lowMatch = widget.text.match(/Low: (\d+)/);
    
    const critical = criticalMatch ? parseInt(criticalMatch[1]) : 0;
    const high = highMatch ? parseInt(highMatch[1]) : 0;
    const medium = mediumMatch ? parseInt(mediumMatch[1]) : 0;
    const low = lowMatch ? parseInt(lowMatch[1]) : 0;
    
    return {
      labels: ['Security Issues'],
      datasets: [
        {
          label: 'Critical',
          data: [critical],
          backgroundColor: chartColors.red,
          borderWidth: 1,
        },
        {
          label: 'High',
          data: [high],
          backgroundColor: chartColors.orange,
          borderWidth: 1,
        },
        {
          label: 'Medium',
          data: [medium],
          backgroundColor: chartColors.yellow,
          borderWidth: 1,
        },
        {
          label: 'Low',
          data: [low],
          backgroundColor: chartColors.green,
          borderWidth: 1,
        }
      ]
    };
  };
  
  const parseImageRiskBarData = () => {
    const criticalMatch = widget.text.match(/Critical: (\d+)/);
    const highMatch = widget.text.match(/High: (\d+)/);
    const totalMatch = widget.text.match(/Total Vulnerabilities: (\d+)/);
    
    const critical = criticalMatch ? parseInt(criticalMatch[1]) : 0;
    const high = highMatch ? parseInt(highMatch[1]) : 0;
    const others = totalMatch ? (parseInt(totalMatch[1]) - critical - high) : 0;
    
    return {
      labels: ['Vulnerabilities'],
      datasets: [
        {
          label: 'Critical',
          data: [critical],
          backgroundColor: chartColors.red,
          borderWidth: 1,
        },
        {
          label: 'High',
          data: [high],
          backgroundColor: chartColors.orange,
          borderWidth: 1,
        },
        {
          label: 'Others',
          data: [others],
          backgroundColor: chartColors.yellow,
          borderWidth: 1,
        }
      ]
    };
  };

  const chartData = parseWidgetData();

  const getCenterText = () => {
    if (!chartData?.data?.datasets?.[0]) return '';
    return chartData.data.datasets[0].data.reduce((a, b) => a + b, 0).toString();
  };

  const renderChart = () => {
    if (!chartData?.data) {
      return (
        <div className="no-data" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '10px',
          textAlign: 'center',
          color: '#6c757d',
          fontSize: '14px'
        }}>
          <img 
            src={chartPlaceholder} 
            alt="Chart placeholder" 
            style={{ 
              maxWidth: '100%', 
              height: 'auto',
              maxHeight: '120px',
              marginBottom: '10px',
              opacity: 0.7
            }} 
          />
          <div>{widget.text}</div>
        </div>
      );
    }

    switch(chartData.type) {
      case 'doughnut':
        return <DoughnutChart data={chartData.data} centerText={getCenterText()} />;
      case 'bar':
        return <BarChart data={chartData.data} />;
      default:
        return <div>Unsupported chart type</div>;
    }
  };

  return (
    <div className="widget-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="widget-header">
        <h3 className="widget-title">{widget.name}</h3>
        <button 
          className="remove-widget-btn" 
          onClick={handleRemove}
          aria-label={`Remove ${widget.name}`}
        >
          <X size={16} />
        </button>
      </div>
      
      <div className="widget-content" style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        {renderChart()}
      </div>
    </div>
  );
}

export default Widget;