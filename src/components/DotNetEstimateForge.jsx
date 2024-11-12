import React, { useState } from 'react';
import { Download, Plus, Minus } from 'lucide-react';

const DotNetEstimateForge = () => {
  const componentTypes = {
    domainModel: {
      name: "Domain Model & Business Logic",
      metrics: {
        entities: { name: "Entities", hoursPerUnit: 4 },
        businessRules: { name: "Business Rules", hoursPerUnit: 6 },
        validations: { name: "Validation Rules", hoursPerUnit: 3 }
      },
      patterns: {
        simple: { multiplier: 1.0, name: "Simple CRUD" },
        ddd: { multiplier: 1.6, name: "Domain-Driven Design" },
        cqrs: { multiplier: 1.4, name: "CQRS" },
        eventSourced: { multiplier: 1.8, name: "Event Sourced" }
      }
    },
    dataAccess: {
      name: "Data Access & Persistence",
      metrics: {
        repositories: { name: "Repositories", hoursPerUnit: 6 },
        dbContexts: { name: "DbContext Configs", hoursPerUnit: 4 },
        migrations: { name: "Migrations", hoursPerUnit: 3 }
      },
      patterns: {
        repository: { multiplier: 1.0, name: "Basic Repository" },
        unitOfWork: { multiplier: 1.2, name: "Unit of Work" },
        cqrsData: { multiplier: 1.5, name: "CQRS Data" }
      }
    },
    integration: {
      name: "Integration & APIs",
      metrics: {
        endpoints: { name: "API Endpoints", hoursPerUnit: 5 },
        integrations: { name: "External Integrations", hoursPerUnit: 8 },
        messageHandlers: { name: "Message Handlers", hoursPerUnit: 6 }
      },
      patterns: {
        rest: { multiplier: 1.0, name: "REST API" },
        graphql: { multiplier: 1.3, name: "GraphQL" },
        grpc: { multiplier: 1.2, name: "gRPC" }
      }
    }
  };

  const complexityMultipliers = {
    low: 0.8,
    medium: 1.0,
    high: 1.3
  };

  const getInitialMetrics = (type) => {
    return Object.keys(componentTypes[type].metrics).reduce((acc, key) => {
      acc[key] = 0;
      return acc;
    }, {});
  };

  const [components, setComponents] = useState([{
    id: 1,
    type: 'domainModel',
    title: '',
    pattern: 'simple',
    complexity: 'medium',
    metrics: getInitialMetrics('domainModel'),
    assumptions: '',
    risks: ''
  }]);

  const updateComponent = (id, field, value) => {
    setComponents(prev => prev.map(component => {
      if (component.id !== id) return component;
      
      if (field === 'type') {
        return {
          ...component,
          type: value,
          pattern: Object.keys(componentTypes[value].patterns)[0],
          metrics: getInitialMetrics(value)
        };
      }
      return { ...component, [field]: value };
    }));
  };

  const updateMetric = (id, metric, value) => {
    const numValue = parseInt(value) || 0;
    setComponents(prev => prev.map(component => 
      component.id === id ? {
        ...component,
        metrics: { ...component.metrics, [metric]: numValue }
      } : component
    ));
  };

  const addComponent = () => {
    const id = Math.max(0, ...components.map(c => c.id)) + 1;
    setComponents(prev => [...prev, {
      id,
      type: 'domainModel',
      title: '',
      pattern: 'simple',
      complexity: 'medium',
      metrics: getInitialMetrics('domainModel'),
      assumptions: '',
      risks: ''
    }]);
  };

  const removeComponent = (id) => {
    setComponents(prev => prev.filter(c => c.id !== id));
  };

  const calculateEffort = (component) => {
    const typeConfig = componentTypes[component.type];
    let baseHours = 0;
    Object.entries(component.metrics).forEach(([metric, value]) => {
      if (typeConfig.metrics[metric]) {
        baseHours += value * typeConfig.metrics[metric].hoursPerUnit;
      }
    });

    const patternMultiplier = typeConfig.patterns[component.pattern].multiplier;
    const complexityMultiplier = complexityMultipliers[component.complexity];
    const totalHours = Math.round(baseHours * patternMultiplier * complexityMultiplier);
    return { hours: totalHours, days: Math.round((totalHours / 8) * 10) / 10 };
  };

  const exportToCsv = () => {
    const headers = ['Component Title', 'Type', 'Pattern', 'Complexity', 'Effort (Hours)', 'Effort (Days)', 'Metrics', 'Assumptions', 'Risks'].join(',');
    const rows = components.map(component => {
      const effort = calculateEffort(component);
      const metrics = Object.entries(component.metrics).map(([key, value]) => `${key}: ${value}`).join('; ');
      return [
        `"${component.title || 'Untitled'}"`,
        `"${componentTypes[component.type].name}"`,
        `"${componentTypes[component.type].patterns[component.pattern].name}"`,
        `"${component.complexity}"`,
        effort.hours,
        effort.days,
        `"${metrics}"`,
        `"${(component.assumptions || '').replace(/"/g, '""')}"`,
        `"${(component.risks || '').replace(/"/g, '""')}"`,
      ].join(',');
    });

    const totalEffort = components.reduce(
      (acc, component) => {
        const effort = calculateEffort(component);
        return { hours: acc.hours + effort.hours, days: acc.days + effort.days };
      }, { hours: 0, days: 0 }
    );

    rows.push(['"TOTAL"', '""', '""', '""', totalEffort.hours, totalEffort.days, '""', '""', '""'].join(','));

    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `project_estimate_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">.NET Project Estimate Generator</h2>
            <button 
              onClick={exportToCsv} 
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Download className="w-5 h-5 mr-2" />
              Export CSV
            </button>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold">Total Effort</h3>
            <div className="flex justify-between text-gray-700 mt-2">
              <div>Total Hours: <strong>{components.reduce((acc, component) => acc + calculateEffort(component).hours, 0)}</strong></div>
              <div>Total Man Days: <strong>{components.reduce((acc, component) => acc + calculateEffort(component).days, 0)}</strong></div>
            </div>
          </div>

          <div className="space-y-6">
            {components.map(component => (
              <div key={component.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center gap-4 mb-4">
                  <select 
                    className="flex-1 p-2 border rounded-md"
                    value={component.type}
                    onChange={(e) => updateComponent(component.id, 'type', e.target.value)}
                  >
                    {Object.entries(componentTypes).map(([key, type]) => (
                      <option key={key} value={key}>{type.name}</option>
                    ))}
                  </select>
                  <select 
                    className="flex-1 p-2 border rounded-md"
                    value={component.pattern}
                    onChange={(e) => updateComponent(component.id, 'pattern', e.target.value)}
                  >
                    {Object.entries(componentTypes[component.type].patterns).map(([key, pattern]) => (
                      <option key={key} value={key}>{pattern.name}</option>
                    ))}
                  </select>
                  <select 
                    className="flex-1 p-2 border rounded-md"
                    value={component.complexity}
                    onChange={(e) => updateComponent(component.id, 'complexity', e.target.value)}
                  >
                    <option value="low">Low Complexity</option>
                    <option value="medium">Medium Complexity</option>
                    <option value="high">High Complexity</option>
                  </select>
                  <button 
                    onClick={() => removeComponent(component.id)} 
                    className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                </div>

                <input 
                  type="text"
                  placeholder="Component Title"
                  value={component.title}
                  onChange={(e) => updateComponent(component.id, 'title', e.target.value)}
                  className="w-full p-2 mb-4 border rounded-md"
                />

                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold mb-2">Metrics</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(componentTypes[component.type].metrics).map(([key, metric]) => (
                      <div key={key} className="space-y-1">
                        <label className="block text-sm text-gray-600">
                          {metric.name} <span className="text-xs text-gray-400">({metric.hoursPerUnit}h/unit)</span>
                        </label>
                        <input 
                          type="number" 
                          min="0" 
                          value={component.metrics[key] || 0}
                          onChange={(e) => updateMetric(component.id, key, e.target.value)}
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Assumptions</label>
                    <textarea 
                      value={component.assumptions}
                      onChange={(e) => updateComponent(component.id, 'assumptions', e.target.value)}
                      className="w-full p-2 border rounded-md"
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Risks</label>
                    <textarea 
                      value={component.risks}
                      onChange={(e) => updateComponent(component.id, 'risks', e.target.value)}
                      className="w-full p-2 border rounded-md"
                      rows={2}
                    />
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex justify-between text-gray-700">
                    <div>Effort (Hours): <strong>{calculateEffort(component).hours}</strong></div>
                    <div>Man Days: <strong>{calculateEffort(component).days}</strong></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={addComponent} 
            className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Component
          </button>
        </div>
      </div>
    </div>
  );
};

export default DotNetEstimateForge;
