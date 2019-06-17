import { LitElement, html, css, property, customElement } from 'lit-element';

function isAnchor(el: Node): el is HTMLAnchorElement {
  return el instanceof HTMLAnchorElement;
};
@customElement('pho3nix-header')
export class Pho3nixHeader extends LitElement {
  @property({ type: String })
  title = '';

  @property({ type: Number })
  selected = 0;

  @property({ type: String })
  logo = '';

  @property({ type: String })
  alt = '';

  @property({ type: Boolean, reflect: true, attribute: true })
  sticky = false;

  @property({ type: Boolean, reflect: true, attribute: true })
  collapsed = false;

  private previousPageYOffset = 0;

  static get styles() {
    return [
      css`
        @keyframes slideOutUp {
          from {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
            opacity: 1;
          }

          to {
            visibility: hidden;
            -webkit-transform: translate3d(0, -100%, 0);
            transform: translate3d(0, -100%, 0);
            opacity: 0;
          }
        }
        @keyframes slideInDown {
          from {
            -webkit-transform: translate3d(0, -100%, 0);
            transform: translate3d(0, -100%, 0);
            visibility: visible;
            opacity: 0;
          }

          to {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
            opacity: 1;
          }
        }
        #wrapper {
          left: 0px;
          right: 0px;
          background-color: var(--bg-color, inherit);
          display: flex;
          flex-direction: row;
          align-items: center;
          box-sizing: border-box;
          transition: top 400ms ease;
          animation-duration: 300ms;
        }
        #wrapper.preload {
          display: none;
        }
        #wrapper.hide {
          position: fixed;
          animation-name: slideOutUp;
          animation-fill-mode: forwards;
        }
        #wrapper.sticky {
          position: fixed;
          animation-name: slideInDown;
          animation-fill-mode: forwards;
        }
        #logo {
          height: 96px;
          margin: 16px;
        }
        #title {
          font-size: 21px;
          line-height: 32px;
        }
        slot {
          flex: 1;
          align-items: center;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 0 32px 0 10%;
        }

        ::slotted(a) {
          color: inherit;
          background-image: url('data:image/svg+xml;base64, PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxIDEiIHNoYXBlLXJlbmRlcmluZz0iY3Jpc3BFZGdlcyI+PHJlY3QgZmlsbD0iI2U5M2YzOSIgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgLz48L3N2Zz4=');
          background-repeat: repeat-x;
          background-position: bottom;
          background-size: 0px;
          text-decoration: none;
          padding-bottom: 5px;
          padding-top: 5px;
          transition: background-size 400ms ease;
          cursor: pointer;
        }
        ::slotted(a:hover) {
          background-size: 2px;
        }
        :host {
          min-height: 128px;
        }
        :host([collapsed]) {
          min-height: 0px;
        }
        :host([collapsed]) #wrapper {
          margin-top: -64px;
        }
        :host([collapsed]) #openButton,
        :host([collapsed]) #closeButton {
          display: flex;
          justify-content: center;
          align-items: center;
          width: var(--button-size, 64px);
          height: var(--button-size, 64px);
          border-radius: var(--button-border-radius, 32px);
          background-color: var(--button-bg, white);
          background-repeat: no-repeat;
          background-size: var(--button-icon-size, 32px 32px);
          background-position: center;
          background-image: url('data:image/svg+xml;base64, PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGFyaWEtaGlkZGVuPSJ0cnVlIiBmb2N1c2FibGU9ImZhbHNlIiBkYXRhLXByZWZpeD0iZmFzIiBkYXRhLWljb249ImJhcnMiIGNsYXNzPSJzdmctaW5saW5lLS1mYSBmYS1iYXJzIGZhLXctMTQiIHJvbGU9ImltZyIgdmlld0JveD0iMCAwIDQ0OCA1MTIiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTE2IDEzMmg0MTZjOC44MzcgMCAxNi03LjE2MyAxNi0xNlY3NmMwLTguODM3LTcuMTYzLTE2LTE2LTE2SDE2QzcuMTYzIDYwIDAgNjcuMTYzIDAgNzZ2NDBjMCA4LjgzNyA3LjE2MyAxNiAxNiAxNnptMCAxNjBoNDE2YzguODM3IDAgMTYtNy4xNjMgMTYtMTZ2LTQwYzAtOC44MzctNy4xNjMtMTYtMTYtMTZIMTZjLTguODM3IDAtMTYgNy4xNjMtMTYgMTZ2NDBjMCA4LjgzNyA3LjE2MyAxNiAxNiAxNnptMCAxNjBoNDE2YzguODM3IDAgMTYtNy4xNjMgMTYtMTZ2LTQwYzAtOC44MzctNy4xNjMtMTYtMTYtMTZIMTZjLTguODM3IDAtMTYgNy4xNjMtMTYgMTZ2NDBjMCA4LjgzNyA3LjE2MyAxNiAxNiAxNnoiLz48L3N2Zz4');
        }
        :host([collapsed]) #closeButton {
          align-self: flex-start;
          background-image: url('data:image/svg+xml;base64, PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGFyaWEtaGlkZGVuPSJ0cnVlIiBmb2N1c2FibGU9ImZhbHNlIiBkYXRhLXByZWZpeD0iZmFzIiBkYXRhLWljb249InRpbWVzIiBjbGFzcz0ic3ZnLWlubGluZS0tZmEgZmEtdGltZXMgZmEtdy0xMSIgcm9sZT0iaW1nIiB2aWV3Qm94PSIwIDAgMzUyIDUxMiI+PHBhdGggZmlsbD0iY3VycmVudENvbG9yIiBkPSJNMjQyLjcyIDI1NmwxMDAuMDctMTAwLjA3YzEyLjI4LTEyLjI4IDEyLjI4LTMyLjE5IDAtNDQuNDhsLTIyLjI0LTIyLjI0Yy0xMi4yOC0xMi4yOC0zMi4xOS0xMi4yOC00NC40OCAwTDE3NiAxODkuMjggNzUuOTMgODkuMjFjLTEyLjI4LTEyLjI4LTMyLjE5LTEyLjI4LTQ0LjQ4IDBMOS4yMSAxMTEuNDVjLTEyLjI4IDEyLjI4LTEyLjI4IDMyLjE5IDAgNDQuNDhMMTA5LjI4IDI1NiA5LjIxIDM1Ni4wN2MtMTIuMjggMTIuMjgtMTIuMjggMzIuMTkgMCA0NC40OGwyMi4yNCAyMi4yNGMxMi4yOCAxMi4yOCAzMi4yIDEyLjI4IDQ0LjQ4IDBMMTc2IDMyMi43MmwxMDAuMDcgMTAwLjA3YzEyLjI4IDEyLjI4IDMyLjIgMTIuMjggNDQuNDggMGwyMi4yNC0yMi4yNGMxMi4yOC0xMi4yOCAxMi4yOC0zMi4xOSAwLTQ0LjQ4TDI0Mi43MiAyNTZ6Ii8+PC9zdmc+');
        }

        @media only screen and (max-width: 1280px) {
            #wrapper, slot {
                flex-direction: column;
            }
            slot {
              justify-content: flex-end;
            }
            ::slotted(a) {
              margin-left: 0;
            }
        }
      `
    ];
  }

  private get wrapper(): HTMLElement | null {
    return this.renderRoot && this.renderRoot.querySelector('#wrapper');
  }
  private get openButton(): HTMLElement | null {
    return this.renderRoot && this.renderRoot.querySelector('#openButton');
  }

  private get slotted(): Node[] | null {
    const slot: HTMLSlotElement | null = this.renderRoot && this.renderRoot.querySelector('slot');
    const assignedNodes: Node[] | null = slot && slot.assignedNodes();
    return assignedNodes && assignedNodes.filter(isAnchor);
  }

  protected onScroll: () => void = () => {
    const wrapper = this.wrapper;
    if (this.collapsed) {
      if (this.isMenuOpen) this.toggleMenu();
      return;
    };
    if (this.sticky && wrapper) {
      if (this.previousPageYOffset < window.pageYOffset) {
        wrapper.classList.remove('sticky');
        wrapper.classList.add('hide');
      } else {
        wrapper.classList.remove('hide'); 
        wrapper.classList.add('sticky');
      }
    }
    this.previousPageYOffset = window.pageYOffset;
  }

  protected onClick: (event: Event) => void = (event: Event) => {
    const slotted = this.slotted;
    const target = (<HTMLElement>event.target);
    if (target && slotted && slotted.includes(target)) {
      this.selected = slotted.indexOf(target);
    }
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('scroll', this.onScroll);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('scroll', this.onScroll);
  }

  private get isMenuOpen() {
    const { wrapper } = this;
    return wrapper && wrapper.classList.contains('sticky');
  }

  private toggleMenu() {
    const { wrapper, openButton } = this;
    if (wrapper && openButton) {
      wrapper.classList.contains('preload') && wrapper.classList.remove('preload');
      wrapper.classList.toggle('sticky');
      wrapper.classList.toggle('hide');
      openButton.classList.toggle('close');
    }
  }

  protected render() {
   return html`
   <style>
    ::slotted(a:nth-of-type(${this.selected + 1})) {
        background-size: 2px;
        cursor: initial;
    }
   </style>
    <a id="openButton" @click=${this.toggleMenu}></a>
    <div id="wrapper" class="${this.collapsed ? 'preload hide' : ''}" @click="${this.onClick}">
      <a id="closeButton" @click=${this.toggleMenu}></a>
      <img id='logo' src="${this.logo}" alt=${this.alt}>
      <span id='title'>${this.title}</span>
      <slot></slot>
    </div>
    `;
  }
}
