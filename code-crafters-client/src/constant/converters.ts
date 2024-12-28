export class ColorConfig {
  static config = {
    draft: 'hsl(var(--background))',
    'draft-foreground': 'hsl(var(--foreground))',
    active: 'hsl(var(--active))',
    'active-foreground': 'hsl(var(--primary-foreground))',
    pending: 'hsl(var(--inactive))',
    'pending-foreground': 'hsl(var(--primary-foreground))',
    rejected: 'hsl(var(--accent))',
    'rejected-foreground': 'hsl(var(--muted-foreground))',
  } as const;

  public static getStatusColor(status: keyof typeof ColorConfig.config) {
    const background = ColorConfig.config[status] || 'transparent';
    const foreground = ColorConfig.config[`${status}-foreground` as keyof typeof ColorConfig.config];
    return {background, foreground};
  }
}

export type ColorConfigKey = keyof typeof ColorConfig.config;

export const KeyDialogs = {
  language: 'language',
};
export type IKeyDialog = typeof KeyDialogs[keyof typeof KeyDialogs];
