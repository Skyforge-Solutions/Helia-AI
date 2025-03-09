// Placeholder component for the removed artifacts system
// This file exists only to satisfy imports and prevent build errors

import React from "react";

interface ArtifactConfig {
  kind: string;
  description: string;
  onStreamPart: (props: any) => void;
  content: React.ComponentType<any>;
  actions: any[];
}

export class Artifact {
  kind: string;
  description: string;
  onStreamPart: (props: any) => void;
  content: React.ComponentType<any>;
  actions: any[];

  constructor(config: ArtifactConfig) {
    this.kind = config.kind;
    this.description = config.description;
    this.onStreamPart = config.onStreamPart;
    this.content = config.content;
    this.actions = config.actions;

    console.warn(
      "Artifact system is deprecated and will be removed in a future version."
    );
  }
}
