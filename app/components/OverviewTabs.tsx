"use client";

import React, { useState, useTransition } from 'react';
import MarkdownContent from './MarkdownContent';

import HeroBanner from './HeroBanner';

interface TabData {
  id: string;
  label: string;
}

const BRIEF_CONTENTS = {
  background: `
# Background

Federal legislation, beginning with the Moving Ahead for Progress in the 21st Century Act (MAP-21) in 2012 and continuing through the FAST Act and the Infrastructure Investment and Jobs Act (IIJA), requires a performance-based approach to transportation planning. This framework, known as Transportation Performance Management (TPM), uses objective data to monitor progress toward national goals and to prioritize investment and policy decisions.

## Framework and Implementation

The Federal Highway Administration (FHWA) and the Federal Transit Administration (FTA) issued rules requiring State Departments of Transportation (DOTs), Metropolitan Planning Organizations (MPOs), and transit agencies to implement this approach. These rules established specific performance measures, often grouped into three categories:

* **PM1: Safety**
* **PM2: Infrastructure**
* **PM3: System Performance**
* **PM3: Transit**

State DOTs, MPOs, and transit providers must coordinate to set performance targets and link their investment priorities to achieving those targets. MPOs generally have the option to either adopt their own targets or support those set by the state or transit provider, though they must collectively establish targets with the state for traffic congestion measures. This collaborative process is intended to ensure that transportation investments collectively move the nation toward its established goals.
  `,
  safety: `
# Safety Performance Measures

The Bipartisan Infrastructure Law (BIL) continues the Highway Safety Improvement Program (HSIP), which aims to achieve a significant reduction in traffic fatalities and serious injuries on all public roads, including locally owned roads and roads on Tribal lands. The HSIP requires a data-driven, performance-based approach to improving roadway safety through strategic investments and the monitoring of safety outcomes.

Under federal regulations, state departments of transportation (State DOTs) and Metropolitan Planning Organizations (MPOs) are required to establish and report annual safety performance targets. For each of the five federally required safety performance measures, MPOs may either support the statewide targets established by the State DOT or establish targets specific to their metropolitan planning area.

The five required safety performance measures are:

1. Number of fatalities.
2. Fatality rate (fatalities per 100 million vehicle miles traveled).
3. Number of serious injuries.
4. Serious injury rate (serious injuries per 100 million vehicle miles traveled).
5. Number of non-motorized (pedestrian and bicyclist) fatalities and serious injuries.

The Tri-Cities Area Metropolitan Planning Organization (TCAMPO) supports the Commonwealth of Virginia's goal of reducing traffic fatalities and serious injuries through a safe, multimodal transportation system. In coordination with the Virginia Department of Transportation (VDOT), TCAMPO annually adopts safety performance targets that are consistent with federal requirements and incorporates them into the Long-Range Transportation Plan (LRTP) and the Metropolitan Transportation Improvement Program (MTIP). Tracking these performance measures helps guide transportation planning and investment decisions that improve safety and enhance mobility for all roadway users.

TCAMPO's Transportation Policy Board annually considers the statewide safety performance targets established by VDOT and formally adopts a resolution either supporting the Commonwealth's targets or establishing targets specific to the TCAMPO planning area.
  `,
  infrastructure: `
# Infrastructure Conditions

The National Highway Performance Program (NHPP) provides support for the condition and performance of the National Highway System (NHS), for the construction of new facilities, and to ensure that investments of Federal-aid funds in highway construction are directed to support progress toward the achievement of performance targets established in a State's asset management plan for the NHS. 

State DOTs are required to set 2-year and 4-year targets, however MPOs are only required to set 4-year targets. For the target setting process, to the maximum extent practicable, the MPO and State DOTs must coordinate in the selection of performance targets.

## Pavement Condition

For each of the below performance measures MPOs can agree to support the State DOT Target or establish their own target specific to the MPO planning area:

* Percentage of pavements on the Interstate System in Good condition
* Percentage of pavements on the Interstate System in Poor condition
* Percentage of the non-interstate National Highway System in Good condition
* Percentage of the non-interstate National Highway System in Poor condition

## Bridge Condition

For each of the below performance measures, MPOs can agree to support the State DOT Target or establish their own target specific to the MPO planning area:

* Percentage of National Highway System bridges classified as in Good condition
* Percentage of National Highway System bridges classified as in Poor condition
  `,
  systemPerformance: `
# System Performance Measures

System Performance measures evaluate the National Highway System (NHS), freight movement, traffic congestion, and mobile source emissions. They support the National Highway Performance Program (NHPP) and the Congestion Mitigation and Air Quality Improvement (CMAQ) Program.

## Core Performance Categories

* **Traffic Congestion:** Evaluates annual hours of peak-hour excessive delay (PHED) per capita and the percentage of non-single-occupancy vehicle (non-SOV) travel in qualifying urbanized areas.
* **Travel Time Reliability:** Assesses the consistency of travel times on Interstate and non-Interstate NHS routes. State DOTs set 2- and 4-year targets; MPOs establish 4-year targets by either supporting state targets or setting region-specific ones.
* **Freight Movement:** Measures truck travel time reliability across the Interstate System during peak, off-peak, weekend, and overnight periods to ensure efficient goods movement.
  `,
  transit: `
# Transit Performance Measures

The Federal Transit Administration (FTA) requires MPOs to coordinate with transit providers to establish performance targets. This data-driven framework ensures transit systems maintain a state of good repair and continuously improve operational safety.

## Core Transit Programs

* **Transit Asset Management (TAM):** Focuses on maintaining infrastructure by tracking the percentage of revenue/non-revenue vehicles exceeding their useful life benchmark, facilities falling below required condition ratings, and track/rail infrastructure with performance restrictions.
* **Public Transportation Agency Safety Plan (PTASP):** Implements a safety management framework for federally funded transit providers, establishing clear performance targets to reduce incidents and improve operational safety.
  `,
};

export default function OverviewTabs() {
  const [activeTab, setActiveTab] = useState<string>('background');
  const [isPending, startTransition] = useTransition();

  const tabs: TabData[] = [
    { id: 'background', label: 'Background' },
    { id: 'safety', label: 'Safety' },
    { id: 'infrastructure', label: 'Infrastructure' },
    { id: 'systemPerformance', label: 'System Performance' },
    { id: 'transit', label: 'Transit' },
  ];

  const handleTabChange = (tabId: string) => {
    startTransition(() => {
      setActiveTab(tabId);
    });
  };

  return (
    <div className="w-full">
      <HeroBanner title="Overview" />

      {/* Premium Dark Tab Bar */}
      <div className="border-b border-[#2a2f45] mb-8 overflow-x-auto scrollbar-thin">
        <div className="flex min-w-max">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`py-3.5 px-6 text-xs font-extrabold uppercase tracking-wider transition-all duration-150 rounded-none cursor-pointer -mb-[1px] border-t-2 ${
                  isActive
                    ? 'bg-[#1a1d2e] border-t-[#38bdf8] border-x border-x-[#2a2f45] border-b-[#1a1d2e] text-[#38bdf8]'
                    : 'bg-[#0f1117] border-t-transparent border-x border-x-transparent border-b-[#2a2f45] text-slate-500 hover:bg-[#1a1d2e] hover:text-slate-300'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Contents with Transition effect */}
      <div className={`transition-opacity duration-300 ${isPending ? 'opacity-50' : 'opacity-100'}`}>
        {activeTab === 'background' && (
          <MarkdownContent content={BRIEF_CONTENTS.background} />
        )}

        {activeTab === 'safety' && (
          <MarkdownContent content={BRIEF_CONTENTS.safety} />
        )}

        {activeTab === 'infrastructure' && (
          <MarkdownContent content={BRIEF_CONTENTS.infrastructure} />
        )}

        {activeTab === 'systemPerformance' && (
          <MarkdownContent content={BRIEF_CONTENTS.systemPerformance} />
        )}

        {activeTab === 'transit' && (
          <MarkdownContent content={BRIEF_CONTENTS.transit} />
        )}
      </div>
    </div>
  );
}
