import './commands';
import '../../src/index.css';

import { mount } from 'cypress/react';

Cypress.Commands.add('mount', mount);
