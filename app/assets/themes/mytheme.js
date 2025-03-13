import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{indigo.50}',
      100: '{indigo.100}',
      200: '{indigo.200}',
      300: '{indigo.300}',
      400: '{indigo.400}',
      500: '{indigo.500}',
      600: '{indigo.600}',
      700: '{indigo.700}',
      800: '{indigo.800}',
      900: '{indigo.900}',
      950: '{indigo.950}',
    },
    datatable: {
      headerCell: {
        backgroundColor: '#217282',
        color: '#ffffff',
        padding: '12px 16px',
        fontWeight: '600',
        borderColor: '#2A3441',
      },
      bodyCell: {
        padding: '12px 16px',
        borderColor: '#2A3441',
        color: '#cdcdcd',
      },
      row: {
        backgroundColor: 'rgba(28, 34, 42, 0.8)',
        hoverBackgroundColor: 'rgba(42, 52, 65, 0.9)',
      },
      // 斑马纹样式
      rowStripe: {
        backgroundColor: 'rgba(28, 34, 42, 0.6)',
      },
      // 选中行样式
      rowSelected: {
        backgroundColor: 'rgba(64, 126, 138, 0.2)',
      },
    },

  },
})

export default {
  preset: MyPreset,
  options: {
    darkModeSelector: '.p-dark',
  },
}
