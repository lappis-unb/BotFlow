import React from 'react';
import { Save, UtterName} from './style';
import {Navbar} from './style';

const SaveData = () => (
        <div>
          <Navbar>
                <Save variant="contained" onClick={() => this.handleClick()} >
                    Gravar
                </Save>
            <UtterName
                id="filled-email-input"
                label="Nome da Resposta"
                type="Nome da Resposta"
                name="Nome da Resposta"
                autoComplete="Nome da Resposta"
                margin="normal"
                variant="filled"
            />
          </Navbar> 
        </div>
    );

export default SaveData;