import { useEffect, useState, type RefObject } from 'react';
import {
  DEFAULT_EXPORT_SELECTION,
  EXPORT_OPTIONS,
  type ExportOptionId,
} from '../lib/exportOptions';

interface ExportAllDialogProps {
  open: boolean;
  exporting: boolean;
  anchorRef: RefObject<HTMLElement | null>;
  onClose: () => void;
  onConfirm: (selected: ExportOptionId[]) => void;
}

export function ExportAllDialog({
  open,
  exporting,
  anchorRef,
  onClose,
  onConfirm,
}: ExportAllDialogProps) {
  const [selected, setSelected] = useState<Set<ExportOptionId>>(
    () => new Set(DEFAULT_EXPORT_SELECTION),
  );

  useEffect(() => {
    if (open) {
      setSelected(new Set(DEFAULT_EXPORT_SELECTION));
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && !exporting) {
        onClose();
      }
    }

    function handlePointerDown(event: MouseEvent) {
      if (
        !exporting &&
        anchorRef.current &&
        !anchorRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [open, exporting, onClose, anchorRef]);

  if (!open) return null;

  function toggleOption(id: ExportOptionId) {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function handleConfirm() {
    if (selected.size === 0 || exporting) return;
    onConfirm([...selected]);
  }

  return (
    <div
      className="export-dialog"
      role="dialog"
      aria-modal="false"
      aria-labelledby="export-dialog-title"
    >
        <h2 id="export-dialog-title" className="export-dialog__title">
          Export all
        </h2>
        <p className="export-dialog__subtitle">
          Choose which files to download.
        </p>

        <ul className="export-dialog__options">
          {EXPORT_OPTIONS.map((option) => (
            <li key={option.id}>
              <label className="export-dialog__option">
                <input
                  type="checkbox"
                  className="export-dialog__checkbox"
                  checked={selected.has(option.id)}
                  disabled={exporting}
                  onChange={() => toggleOption(option.id)}
                />
                <span>{option.label}</span>
              </label>
            </li>
          ))}
        </ul>

        <div className="export-dialog__actions">
          <button
            type="button"
            className="export-dialog__btn export-dialog__btn--secondary"
            onClick={onClose}
            disabled={exporting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="export-dialog__btn export-dialog__btn--primary"
            onClick={handleConfirm}
            disabled={selected.size === 0 || exporting}
            aria-busy={exporting}
          >
            {exporting && <span className="export-all-btn__spinner" aria-hidden />}
            {exporting ? 'Exporting…' : 'Export'}
          </button>
        </div>
    </div>
  );
}
